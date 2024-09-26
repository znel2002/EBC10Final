use scrypto::prelude::*;

#[derive(Debug, PartialEq, Eq, ScryptoSbor, NonFungibleData, Clone)]
pub struct Escrow {
    amount: Decimal,
    #[mutable]
    approved: bool,
}

#[blueprint]
mod hello {
    struct Hello {
        // Define what resources and data will be managed by Hello components
        fees: Vault,
        user_funds: Vault,
        claim_resource_manager: ResourceManager,
        return_resource_manager: ResourceManager,
        escrow_id: u64,
        adminBadge: ResourceAddress,
    }

    impl Hello {
        pub fn new() -> Bucket {
            let (component_address_reservation, component_component_address) =
                Runtime::allocate_component_address(Hello::blueprint_id());
            let global_caller_badge_rule =
                rule!(require(global_caller(component_component_address)));

            // Create a new token called "HelloToken," with a fixed supply of 1000, and put that supply into a bucket
            let admin_badge: Bucket = ResourceBuilder::new_fungible(OwnerRole::None)
                .divisibility(DIVISIBILITY_MAXIMUM)
                .metadata(metadata! {
                    init {
                        "name" => "Admin Token", locked;
                        "symbol" => "AT", locked;
                    }
                })
                // .mint_roles(mint_roles!(
                //     minter => global_caller_badge_rule.clone();
                //     minter_updater => global_caller_badge_rule.clone();
                // ))
                .mint_initial_supply(1)
                .into();

            let claim_resource_manager =
                ResourceBuilder::new_integer_non_fungible::<Escrow>(OwnerRole::None)
                    .mint_roles(mint_roles!(
                        minter =>global_caller_badge_rule.clone();
                        minter_updater => global_caller_badge_rule.clone();
                    ))
                    .burn_roles(burn_roles!(
                        burner => global_caller_badge_rule.clone();
                        burner_updater => global_caller_badge_rule.clone();
                    ))
                    .non_fungible_data_update_roles(non_fungible_data_update_roles!(
                        non_fungible_data_updater => global_caller_badge_rule.clone();
                        non_fungible_data_updater_updater => global_caller_badge_rule.clone();
                    ))
                    .metadata(metadata! {
                        init {
                            "name" => "Claim NFT", locked;
                            "symbol" => "CNFT", locked;
                        }
                    })
                    .create_with_no_initial_supply();
            let return_resource_manager =
                ResourceBuilder::new_integer_non_fungible::<Escrow>(OwnerRole::None)
                    .mint_roles(mint_roles!(
                        minter => global_caller_badge_rule.clone();
                        minter_updater => global_caller_badge_rule.clone();
                    ))
                    .burn_roles(burn_roles!(
                        burner => global_caller_badge_rule.clone();
                        burner_updater => global_caller_badge_rule.clone();
                    ))
                    .metadata(metadata! {
                        init {
                            "name" => "Return NFT", locked;
                            "symbol" => "RNFT", locked;
                        }
                    })
                    .create_with_no_initial_supply();

            // Instantiate a Hello component, populating its vault with our supply of 1000 HelloToken
            Self {
                fees: Vault::new(XRD),
                user_funds: Vault::new(XRD),
                claim_resource_manager,
                return_resource_manager,
                escrow_id: 1,
                adminBadge: admin_badge.resource_address(),
            }
            .instantiate()
            .prepare_to_globalize(OwnerRole::None)
            .with_address(component_address_reservation)
            .globalize();

            admin_badge
        }

        // This is a method, because it needs a reference to self.  Methods can only be called on components
        pub fn new_escrow(&mut self, mut deposit: Bucket) -> (Bucket, Bucket) {
            self.fees.put(deposit.take(dec!(20)));
            let escrow = Escrow {
                amount: deposit.amount(),
                approved: false,
            };
            self.user_funds.put(deposit);
            let claim_nft = self
                .claim_resource_manager
                .mint_non_fungible(&self.escrow_id.into(), escrow.clone());
            let return_nft: Bucket = self
                .return_resource_manager
                .mint_non_fungible(&self.escrow_id.into(), escrow);
            self.escrow_id += 1;

            (claim_nft, return_nft)
        }

        pub fn approve_payout(&mut self, nft_id: NonFungibleLocalId, admin_badge: Proof) {
            admin_badge.check(self.adminBadge);
            let claim_nft: Escrow = self.claim_resource_manager.get_non_fungible_data(&nft_id);
            assert!(!claim_nft.approved);
            let return_nft: Escrow = self.return_resource_manager.get_non_fungible_data(&nft_id);
            assert!(!return_nft.approved);
            self.claim_resource_manager
                .update_non_fungible_data(&nft_id, "approved", true);
        }

        pub fn cancel_payout(&mut self, nft_id: NonFungibleLocalId) {
            let claim_nft: Escrow = self.claim_resource_manager.get_non_fungible_data(&nft_id);
            assert!(!claim_nft.approved);
            let return_nft: Escrow = self.return_resource_manager.get_non_fungible_data(&nft_id);
            assert!(!return_nft.approved);
            self.return_resource_manager
                .update_non_fungible_data(&nft_id, "approved", true);
        }

        pub fn withdraw_money(&mut self, nft: NonFungibleBucket) -> Bucket {
            let nft_address: ResourceAddress = nft.resource_address();
            assert!(
                nft_address == self.claim_resource_manager.address()
                    || nft_address == self.return_resource_manager.address()
            );
            let nft_data: Escrow = nft.non_fungible().data();
            assert!(nft_data.approved);

            let nft_id: NonFungibleLocalId = nft.non_fungible_local_id();

            assert!(self.claim_resource_manager.non_fungible_exists(&nft_id));
            assert!(self.return_resource_manager.non_fungible_exists(&nft_id));

            nft.burn();

            let money: Bucket = self.user_funds.take(nft_data.amount);
            money
        }
    }
}
