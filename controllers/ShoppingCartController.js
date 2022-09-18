const Shoppingcart = require("../models/Shoppingcart");
const catchAsync = require("../utils/catchAsync");
const Product = require("../models/Product");
exports.addProductShoppingCart = catchAsync(async(req, res) => {

    const foundShoppingCartPending = await Shoppingcart.findOne({ status: "PENDING" });
    let foundProduct = await Product.findById(req.body.productId);
    if (foundProduct) {
        let total = req.body.quantity * foundProduct.price;
        req.body.price = foundProduct.price;
        req.body.total = total;
        let newProduct = null;
        if (foundShoppingCartPending) {
            foundShoppingCartPending.listProducts.push(req.body);
            foundShoppingCartPending.save();
            newProduct = foundShoppingCartPending.listProducts;

        } else {
            newProduct = await Shoppingcart.create({
                    userId: req.user._id,
                    status: "PENDING",
                    listProducts: req.body
                }

            );
            newProduct = newProduct.listProducts;
        }
        res.status(200).json({
            status: "Success",
            message: "Product add to shopping cart",
            data: {
                productList: newProduct,
            },
        });
    } else {
        res.status(404).json({
            status: "Not found",
            message: "Product don't exist",

        });
    }
});
exports.deleteProductShoppingCart = catchAsync(async(req, res) => {

    const foundCartPending = await Shoppingcart.findOne({ status: "PENDING", user: req.user._id });
    if (foundCartPending) {
        const foundProduct = foundCartPending.listProducts.find((x) => x.productId == req.params.id);
        if (foundProduct) {
            foundCartPending.listProducts.pull(foundProduct);
            await foundCartPending.save();
            res.status(200).json({
                status: "Success",
                message: "Product deleted",
            });

        } else {
            res.status(404).json({
                status: "Not Found",
                message: "Product Not found"
            });
        }
    } else {
        res.status(404).json({
            status: "Not Found",
            message: "Don't exist Shopping Cart in status Pending"
        });
    }


});