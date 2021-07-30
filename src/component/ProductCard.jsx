import React from "react";
import "../assets/styles/product_card.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { API_URL } from "../constants/api";
import Axios from "axios";
import { getCartData } from "../redux/actions/cart";
import { Redirect } from "react-router-dom";

class ProductCard extends React.Component {
  addToCartHandler = () => {
    //check user punya barang tsb di cart
    if (this.props.userGlobal.id === 0) {
      alert("Anda Harus Login");
      <Redirect to="/login" />;
    } else {
      Axios.get(`${API_URL}/carts`, {
        params: {
          userId: this.props.userGlobal.id,
          productId: this.props.productData.id,
        },
      }).then((result) => {
        if (result.data.length) {
          Axios.patch(`${API_URL}/carts/${result.data[0].id}`, {
            quantity: result.data[0].quantity + 1,
          })
            .then(() => {
              alert("Berhasil menambahkan ke cart");
              this.props.getCartData(this.props.userGlobal.id);
            })
            .catch(() => {
              alert("Terjadi kesalahan di server");
            });
        } else {
          //barangnya belum ada di carts
          Axios.post(`${API_URL}/carts`, {
            userId: this.props.userGlobal.id,
            productId: this.props.productData.id,
            price: this.props.productData.price,
            productName: this.props.productData.productName,
            productImage: this.props.productData.productImage,
            quantity: 1,
          })
            .then(() => {
              alert("Berhasil menambahkan ke cart");
              this.props.getCartData(this.props.userGlobal.id);
            })
            .catch(() => {
              alert("Terjadi kesalahan di server");
            });
        }
      });
    }
  };

  render() {
    return (
      <div className="card product-card">
        <img src={this.props.productData.productImage} alt="" />
        <div className="mt-2">
          <div>
            <Link
              to={`/product-detail/${this.props.productData.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <h6>{this.props.productData.productName}</h6>
            </Link>
            <span className="text-muted">
              RP. {this.props.productData.price}
            </span>
          </div>
          <div className="d-flex flex-row justify-content-end">
            <Link
              to={`/product-detail/${this.props.productData.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <button
                onClick={this.addToCartHandler}
                className="btn btn-primary mt-2"
              >
                Add to cart
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
  };
};

const mapDispatchToProps = {
  getCartData,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
