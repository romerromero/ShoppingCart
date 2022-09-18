const Shoppingcart = require("../models/Shoppingcart");
const catchAsync = require("../utils/catchAsync");

exports.payShoppingCart = catchAsync(async(req, res) => {
    const foundCartPending = await Shoppingcart.findOne({ status: "PENDING", user: req.user._id });
    if (foundCartPending.listProducts.length > 0 && foundCartPending) {
        foundCartPending.status = "PAID";
        foundCartPending.save();
        res.status(200).json({
            status: "Success",
            message: "Transaction correctly"
        });

    } else {
        res.status(401).json({
            status: "Fail",
            message: "Not exist Product in  Shopping Cart "
        });

    }


});