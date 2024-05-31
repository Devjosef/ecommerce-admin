import prismadb from "@/services/prismadbCustom"; 

interface DashboardData {
    totalRevenue: number;
    salesCount: number;
    stockCount: number;
    graphRevenue: GraphData[]; 
}

interface GraphData {
    name: string;
    total: number;
}

export const fetchDashboardData = async (storeId: string): Promise<DashboardData> => {
    try {
        const totalRevenue = await prismadb.getTotalRevenue(storeId);
        const salesCount = await prismadb.getSalesCount(storeId);
        const stockCount = await prismadb.getStockCount(storeId);
        const graphRevenue = await prismadb.getGraphRevenue(storeId);

        return {
            totalRevenue,
            salesCount,
            stockCount,
            graphRevenue
        };
    } catch (error: unknown) {
        console.error("Failed to fetch dashboard data:", error);
        throw new Error('Error fetching dashboard data');
    }
};