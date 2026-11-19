type ProductKey = "backpack" | "bikeLight" | "boltTShirt" | "fleeceJacket" | "mamelucoBaby" ;

export const products: Record<ProductKey, { name: string }> = {
  backpack: { name: "Sauce Labs Backpack" },
  bikeLight: { name: "Sauce Labs Bike Light" },
  boltTShirt: { name: "Sauce Labs Bolt T-Shirt" },
  fleeceJacket: { name: "Sauce Labs Fleece Jacket" },
  mamelucoBaby: { name: "Sauce Labs Onesie"}
};