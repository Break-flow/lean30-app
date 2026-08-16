import Purchases, { CustomerInfo, PurchasesOffering, PurchasesPackage, PURCHASES_ERROR_CODE } from 'react-native-purchases';
import { ENTITLEMENT_PREMIUM, PRODUCT_MONTHLY, PRODUCT_YEARLY, REVENUECAT } from './constants';
import { Platform } from 'react-native';

export interface PremiumState {
  status: 'unknown' | 'active' | 'inactive' | 'mock';
  packages: { monthly?: PurchasesPackage | null; yearly?: PurchasesPackage | null };
  offering?: PurchasesOffering | null;
  customer?: CustomerInfo;
}

let initialized = false;

function noopState(): PremiumState {
  return { status: 'unknown', packages: {} };
}

export async function initRevenueCat(): Promise<'real' | 'mock'> {
  if (!REVENUECAT.enabled) return 'mock';
  try {
    await Purchases.configure({
      apiKey: Platform.OS === 'ios' ? REVENUECAT.apple : REVENUECAT.google,
    });
    initialized = true;
    return 'real';
  } catch (err) {
    console.warn('[revenuecat] init failed', err);
    return 'mock';
  }
}

export async function getPremiumStatus(): Promise<PremiumState> {
  if (!REVENUECAT.enabled || !initialized) {
    return { status: 'mock', packages: {} };
  }
  try {
    const [customer, offering] = await Promise.all([
      Purchases.getCustomerInfo(),
      Purchases.getOfferings().catch(() => null),
    ]);
    const entitled = customer.entitlements.active[ENTITLEMENT_PREMIUM] != null;
    const products = offering?.current?.availablePackages ?? [];
    return {
      status: entitled ? 'active' : 'inactive',
      customer,
      offering: offering?.current ?? null,
      packages: {
        monthly: products.find((p) => p.product.identifier.includes('month')) ?? null,
        yearly: products.find((p) => p.product.identifier.includes('year')) ?? null,
      },
    };
  } catch (err) {
    const code = (err as { code?: string })?.code;
    if (code === PURCHASES_ERROR_CODE.OFFLINE_CONNECTION_ERROR) {
      return { status: 'unknown', packages: {} };
    }
    return noopState();
  }
}

export async function purchase(pkg?: PurchasesPackage | null): Promise<PremiumState> {
  if (!REVENUECAT.enabled || !initialized || !pkg) {
    // Dev/mock mode — pretend purchase succeeded.
    return { status: 'active', packages: {} };
  }
  try {
    const { customerInfo } = await Purchases.purchasePackage(pkg);
    return { status: 'active', customer: customerInfo, packages: {} };
  } catch (err) {
    const code = (err as { code?: string })?.code;
    if (code === PURCHASES_ERROR_CODE.PURCHASE_CANCELLED_ERROR) {
      return noopState();
    }
    throw err;
  }
}

export async function restorePurchases(): Promise<PremiumState> {
  if (!REVENUECAT.enabled || !initialized) return { status: 'mock', packages: {} };
  const customer = await Purchases.restorePurchases();
  const entitled = customer.entitlements.active[ENTITLEMENT_PREMIUM] != null;
  return { status: entitled ? 'active' : 'inactive', customer, packages: {} };
}

export const idForProduct = (pkg?: PurchasesPackage | null) =>
  pkg ? pkg.product.identifier : '';

export { PRODUCT_MONTHLY, PRODUCT_YEARLY };