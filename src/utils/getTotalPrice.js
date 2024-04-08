export const  getTotalPrice = (cartList) => {
    console.log('dataAll', cartList);
    let totalPrice = 0;
    cartList?.forEach(item => {
        // Lấy giá sản phẩm và số lượng từ mỗi mục trong danh sách giỏ hàng
        const price = parseFloat(item?.price);
        console.log({price});
        const quantity = parseInt(item?.quantity);
        
        totalPrice += price * quantity;
        console.log({totalPrice});
    });
    return totalPrice;
  }
