const db = require("../models/index.model");
Flower = db.flowers;
Order = db.orders;

// Description -------- Add Flowers Page
// Method -------- GET
// Access -------- Private

exports.getAddFlowersPage = async (req, res) => {
  try {
    res.render("main/add-flower", {
      isAuthenticated: req.session.isLogged,
    });
  } catch (error) {
    console.log(error);
  }
};

// Description -------- Add Flowers
// Method -------- POST
// Access -------- Private

exports.createFlower = async (req, res) => {
  try {
    const { imageURL, flowerName, price, desc } = req.body;

    await Flower.create({
      imageURL: imageURL,
      price: price,
      desc: desc,
      flowerName: flowerName,
    });

    res.redirect("/flowers");
  } catch (error) {
    console.log(error);
  }
};

// Description -------- Get All Flowers
// Method -------- GET
// Access -------- Private

exports.getAllFlowers = async (req, res) => {
  try {
    const flowers = await Flower.findAll({ raw: true });

    res.render("main/index", {
      isAuthenticated: req.session.isLogged,
      flowers,
    });
  } catch (error) {
    console.log(error);
  }
};

// Description -------- Edit Flowers Page
// Method -------- GET
// Access -------- Private

exports.getEditFlowerPage = async (req, res) => {
  try {
    const flower = await Flower.findByPk(req.params.id, {
      raw: true,
    });

    res.render("main/edit-flower", {
      title: "Edit Flower",
      flower,
      isAuthenticated: req.session.isLogged,
    });
  } catch (error) {
    console.log(error);
  }
};

// Description -------- Edit Flowers
// Method -------- POST
// Access -------- Private

exports.editFlower = async (req, res) => {
  try {
    const flower = await Flower.findByPk(req.params.id);

    const itemsToUpdate = {
      flowerName: req.body.flowerName || flower.flowerName,
      price: req.body.price || flower.price,
      desc: req.body.desc || flower.desc,
    };

    await Flower.update(itemsToUpdate, {
      where: {
        id: req.params.id,
      },
    });

    res.redirect("/flowers");
  } catch (error) {
    console.log(error);
  }
};

// Description -------- Delete Flowers
// Method -------- POST
// Access -------- Private

exports.deleteFlower = async (req, res) => {
  try {
    await Flower.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.redirect("/flowers");
  } catch (error) {
    console.log(error);
  }
};

// Description -------- Get All Flowers
// Method -------- POST
// Access -------- Public

exports.getAllFlowersUsers = async (req, res) => {
  try {
    const flowers = await Flower.findAll({ raw: true });

    res.render("user/view-flowers", {
      flowers,
    });
  } catch (error) {
    console.log(error);
  }
};

// Description -------- Add flowers to Basket
// Method -------- POST
// Access -------- Public

exports.addToMyOrder = async (req, res) => {
  try {
    await Flower.update({ amount: 1 }, { where: { id: req.params.id } });

    res.redirect("/flowers/main");
  } catch (error) {
    console.log(error);
  }
};

// Description -------- Get Basket
// Method -------- GET
// Access -------- Public

exports.getMyOrder = async (req, res) => {
  try {
    const flowers = await Flower.findAll({ where: { amount: 1 }, raw: true });

    res.render("user/my-orders", {
      flowers,
    });
  } catch (error) {
    console.log(error);
  }
};

// Description -------- Remove from Basket
// Method -------- POST
// Access -------- Public

exports.removeFromBasket = async (req, res) => {
  try {
    await Flower.update({ amount: 0 }, { where: { id: req.params.id } });
    res.redirect("/flowers/my-orders");
  } catch (error) {
    console.log(error);
  }
};

// Description -------- Change status to sold or available
// Method -------- POST
// Access -------- Private

exports.statusChange = async (req, res) => {
  try {
    await Flower.update({ status: "Sold" }, { where: { id: req.params.id } });

    res.redirect("/flowers");
  } catch (error) {
    console.log(error);
  }
};

// Description -------- Change status to sold or available
// Method -------- POST
// Access -------- Private

exports.statusChangeAvailable = async (req, res) => {
  try {
    await Flower.update(
      { status: "Available" },
      { where: { id: req.params.id } }
    );

    res.redirect("/flowers");
  } catch (error) {
    console.log(error);
  }
};

// Description -------- View all ORDERS from clients
// Method -------- GET
// Access -------- Private

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({ raw: true });

    const flowers = await Promise.all(
      orders.map(async (elem, i) => {
        const flower = await Flower.findByPk(elem.flowerId, {
          raw: true,
        });

        return {
          i1: orders[i],
          i2: flower,
        };
      })
    );

    res.render("main/orders", {
      isAuthenticated: req.session.isLogged,
      flowers,
    });
  } catch (error) {
    console.log(error);
  }
};

// Description -------- Get Order Processing Page
// Method -------- GET
// Access -------- Public

exports.getOrderProcessingPage = async (req, res) => {
  try {
    const flower = await Flower.findByPk(req.params.id, {
      raw: true,
    });

    res.render("user/order-process", {
      flower,
      error: req.flash("error"),
    });
  } catch (error) {
    console.log(error);
  }
};

// Description -------- Order Product
// Method -------- POST
// Access -------- Public

exports.orderProduct = async (req, res) => {
  try {
    const { fio, phone, region } = req.body;

    const flower = await Flower.findByPk(req.params.id, {
      raw: true,
    });

    if (fio == "" || phone == "") {
      req.flash("error", "The space cannot be left empty!");
      return res.redirect(`/flowers/order/${req.params.id}`);
    } else {
      await Order.create({
        fio,
        phone,
        region,
        flowerId: flower.id,
      });

      return res.redirect("/flowers/all-orders");
    }
  } catch (error) {
    console.log(error);
  }
};

// Description -------- Total Trade
// Method -------- POST
// Access -------- Private

exports.totalTrade = async (req, res) => {
  try {
    const orders = await Order.findAll();

    const flowers = await Promise.all(
      orders.map(async (elem) => {
        const flower = await Flower.findByPk(elem.flowerId);
        return parseInt(flower.price);
      })
    );

    const sum = flowers.reduce(
      (accumulator, currentValue) => accumulator + currentValue
    );

    res.render("main/total-trade", {
      isAuthenticated: req.session.isLogged,
      sum,
    });
  } catch (error) {
    console.log(error);
  }
};

// Description -------- Get All Orders
// Method -------- GET
// Access -------- Public

exports.getAllOrders = async (req, res) => {
  try {
    const flowers = await Flower.findAll({ where: { amount: 1 }, raw: true });

    res.render("user/all-orders", {
      flowers,
    });
  } catch (error) {
    console.log(error);
  }
};
