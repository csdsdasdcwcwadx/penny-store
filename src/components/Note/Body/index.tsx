import React, { memo } from "react";
import styles from './styles.module.scss';

function Body () {
    return (
        <div className={styles.note}>
            <h1>購物須知</h1>
            <ul>
                <li>依《消費者保護法》規定，消費者享有商品簽收翌日起算七天之鑑賞期，猶豫期並非試用期，所以，您所退回的商品必須是全新的狀態、而且完整包裝、未作任何更動、未損傷、未使用。
                為了保障雙方公平性以及權益，請全程錄影開箱過程，讓我們一同確認，避免後續爭議。
                商品若有「重大瑕疵」，請在收到商品的三天內主動提出退換貨申請（依取貨當日起始計算，逾期無法受理）
                所退回商品請維持「原始包裝」以及所有配件以確保商品完整性。
                經過討論後若確定是我方疏失，會進行退款動作。
                若未依照相關規定申請退換貨事宜，londoner有拒絕退換貨之權利。</li>
            </ul>
            <ul>
                <li>下單即代表已詳閱並且同意購物須知，若有疑問請主動私訊instagram小盒子，將由專人為您服務，希望大家都能買得開心！</li>
            </ul>
        </div>
    )
}

export default memo(Body);