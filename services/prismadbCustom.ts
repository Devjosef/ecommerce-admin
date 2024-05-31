import { getTotalRevenue } from "@/actions/get-total-revenue";
import { getSalesCount } from "@/actions/get-sales-count";
import { getStockCount } from "@/actions/get-stock-count";
import { getGraphRevenue } from "@/actions/get-graph-revenue";

const prismadbCustom = {
    getTotalRevenue,
    getSalesCount,
    getStockCount,
    getGraphRevenue
};

export default prismadbCustom;