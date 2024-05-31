import { useState, useEffect } from 'react';
import prismadbCustom from '@/services/prismadbCustom'; // Correctly importing from updated service

const { getTotalRevenue, getSalesCount, getStockCount, getGraphRevenue } = prismadbCustom;

const useStoreDashboard = (storeId: string) => {
    const [dashboardData, setDashboardData] = useState({
        totalRevenue: 0,
        salesCount: 0,
        stockCount: 0,
        graphRevenue: [] as any[]  // Specify the type here
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const totalRevenue = await getTotalRevenue(storeId);
                const salesCount = await getSalesCount(storeId);
                const stockCount = await getStockCount(storeId);
                const graphRevenue = await getGraphRevenue(storeId);
                setDashboardData(prevData => ({
                    ...prevData,
                    totalRevenue,
                    salesCount,
                    stockCount,
                    graphRevenue: graphRevenue as any[]
                }));
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [storeId]);

    return { dashboardData, loading, error };
};