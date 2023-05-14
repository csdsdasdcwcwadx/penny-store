import React, { memo, useEffect } from "react";
import styles from './styles.module.scss';

const paymentStatus = true;

function Body () {

    useEffect(() =>{
        (async function() {
            console.log("@@@")
        })()
    },[])

    return (
        <div className={styles.paymentSuccess}>
            order
            {
                paymentStatus && <span>success</span>
            }
        </div>
    )
}

export default memo(Body);