export type CurrencyDetailResponseModel = {
    id:string,
    symbol:string,
    name:string,
    image:{
        large:string,
        small:string,
        thumb:string
    },
    total_supply:number,
    
}