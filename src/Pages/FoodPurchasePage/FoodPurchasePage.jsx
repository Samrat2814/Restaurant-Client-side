import React, { useContext } from 'react';
import { AuthContext } from '../../AuthProvider/AuthProvider';

const FoodPurchasePage = () => {
    const {user}= useContext(AuthContext);
    return (
        <div>
            hello
        </div>
    );
};

export default FoodPurchasePage;