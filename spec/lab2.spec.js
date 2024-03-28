const User = require('../lab2');

describe('User class', () => {
    let user;

    beforeEach(() => {
        user = new User('John', 'password');
    });

    describe('addToCart', () => {
        it('should add a product to the cart', () => {
            user.addToCart({ name: 'Product 1', price: 10 });
            expect(user.cart.length).toBe(1);
            expect(user.cart[0].name).toBe('Product 1');
            expect(user.cart[0].price).toBe(10);
        });
    });

    describe('calculateTotalCartPrice', () => {
        it('should return the total price of all products in the cart', () => {
            user.addToCart({ name: 'Product 1', price: 10 });
            user.addToCart({ name: 'Product 2', price: 20 });
            expect(user.calculateTotalCartPrice()).toBe(30);
        });

        it('should return 0 if the cart is empty', () => {
            expect(user.calculateTotalCartPrice()).toBe(0);
        });
    });

    describe('checkout', () => {
        it('should return true if the payment is verified', () => {
            const paymentModel = {
                goToVerifyPage: jasmine.createSpy('goToVerifyPage'),
                returnBack: jasmine.createSpy('returnBack'),
                isVerify: () => true
            };
            expect(user.checkout(paymentModel)).toBe(true);
            expect(paymentModel.goToVerifyPage).toHaveBeenCalled();
            expect(paymentModel.returnBack).toHaveBeenCalled();
        });
    
        it('should return false if the payment is not verified', () => {
            const paymentModel = {
                goToVerifyPage: jasmine.createSpy('goToVerifyPage'),
                returnBack: jasmine.createSpy('returnBack'),
                isVerify: () => false
            };
            expect(user.checkout(paymentModel)).toBe(false);
            expect(paymentModel.goToVerifyPage).toHaveBeenCalled();
            expect(paymentModel.returnBack).toHaveBeenCalled();
        });
    });
    
});
