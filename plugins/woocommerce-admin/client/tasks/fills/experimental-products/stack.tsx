/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { List, Link } from '@woocommerce/components';
import { Text } from '@woocommerce/experimental';
import interpolateComponents from '@automattic/interpolate-components';
import { getAdminLink } from '@woocommerce/settings';
import { recordEvent } from '@woocommerce/tracks';

/**
 * Internal dependencies
 */
import { ProductType } from './constants';
import './stack.scss';
import useRecordCompletionTime from '../use-record-completion-time';

type StackProps = {
	items: ( ProductType & {
		onClick: () => void;
	} )[];
	onClickLoadSampleProduct: () => void;
	showOtherOptions?: boolean;
};

const Stack: React.FC< StackProps > = ( {
	items,
	onClickLoadSampleProduct,
	showOtherOptions = true,
} ) => {
	const { recordCompletionTime } = useRecordCompletionTime( 'products' );

	return (
		<div className="woocommerce-products-stack">
			<List items={ items } />
			{ showOtherOptions && (
				<Text className="woocommerce-stack__other-options">
					{ interpolateComponents( {
						mixedString: __(
							'Can’t find your product type? {{sbLink}}Start Blank{{/sbLink}} or {{LspLink}}Load Sample Products{{/LspLink}} to see what they look like in your store.',
							'woocommerce'
						),
						components: {
							sbLink: (
								<Link
									onClick={ () => {
										recordEvent( 'tasklist_add_product', {
											method: 'manually',
										} );
										recordCompletionTime();
										window.location = getAdminLink(
											'post-new.php?post_type=product&wc_onboarding_active_task=products&tutorial=true'
										);
										return false;
									} }
									href=""
									type="wc-admin"
								>
									<></>
								</Link>
							),
							LspLink: (
								<Link
									href=""
									type="wc-admin"
									onClick={ () => {
										recordCompletionTime();
										onClickLoadSampleProduct();
										return false;
									} }
								>
									<></>
								</Link>
							),
						},
					} ) }
				</Text>
			) }
		</div>
	);
};

export default Stack;
