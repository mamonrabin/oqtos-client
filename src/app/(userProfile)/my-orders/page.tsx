import MyOrders from '@/components/userDashboard/order/MyOrders';
import { getAllOrder } from '@/services/order.api';
import React from 'react';

const page = async() => {
    const {data:orderList} = await getAllOrder()
    
      const orders = orderList?.data
    return (
        <div className=''>
            <MyOrders orders={orders}/>
        </div>
    );
};

export default page;