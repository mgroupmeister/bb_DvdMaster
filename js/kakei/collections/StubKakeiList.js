/**
 * ダミーデータ設定
 * Created by tetsuya.matsuura on 2015/11/15.
 */
define([
    'kakei/models/Kakei'
    ],function(Kakei) {
    return [
        {id: 1, buydate: new Date(), payamount:"1000", incomeamount: "", kamokuId: "01", kamokuName: "食費",notes: "いちご", consumer: "01", consumerName: "てつや", payer: "01", payerName: "はるや"},
        {id: 2, buydate: new Date(), payamount:"2000", incomeamount: "", kamokuId: "02", kamokuName: "交通費",notes: "タクシー", consumer: "01", consumerName: "てつや", payer: "01", payerName: "はるや"},
        {id: 3, buydate: new Date(), payamount:"3000", incomeamount: "", kamokuId: "03", kamokuName: "日用品",notes: "洗剤", consumer: "01", consumerName: "てつや", payer: "01", payerName: "はるや"},
        {id: 4, buydate: new Date(), payamount:"", incomeamount: "300000", kamokuId: "07", kamokuName: "給与",notes: "桃", consumer: "01", consumerName: "てつや", payer: "01", payerName: "はるや"}
    ]
});
