import {Option, Product} from '../stores/CartStore';

export const sendAnalyticsEvent = async (
  items: Product[],
  options: Option[],
): Promise<boolean> => {
  try {
    console.log(
      'Send analytics...',
      JSON.stringify({items, options}, null, ' '),
    );

    await new Promise(resolve => setTimeout(resolve, 1000));

    if (Math.random() < 0.2) {
      throw new Error('Server unavailable');
    }

    console.log('[analytics] Analytics sent successfully');
    return true;
  } catch (err) {
    console.warn('[analytics] Analytics failed to send');
    return false;
  }
};
