import './SellerDetails.css';
import React from "react";
import { fetchSellerDetails, fetchSellerHistory } from "../../DataStore";
import Rating from "@mui/material/Rating";
import CircularProgress from '@mui/material/CircularProgress';
import dayjs, { Dayjs } from 'dayjs';
import ProductHistoryItem from '../../components/productHistoryItem/ProductHistoryItem';
import DateRangePicker from '../../components/dateRangePicker/DateRangePicker';

function SellerDetails() {
    const [sellerDetails, setSellerDetails] = React.useState<any>(undefined);
    const [sellerHistory, setSellerHistory] = React.useState<any>(undefined);
    const [loadingDetails, setLoadingDetails] = React.useState(false);
    const [dateFilter, setDateFilter] = React.useState<[Dayjs, Dayjs] | []>([]);

    const getSellerDetails = React.useCallback(async () => {
        setLoadingDetails(true);

        const response = await fetchSellerDetails()
        setSellerDetails(response);

        setLoadingDetails(false);
    }, []);

    const getSellerHistory = React.useCallback(() => {
        const response = fetchSellerHistory()
        setSellerHistory(response);
    }, []);
      
    React.useEffect(() => {
        getSellerDetails();
        getSellerHistory();
    }, [getSellerDetails, getSellerHistory]);

    const getDate = (date: string) => {
        const newDate = new Date(date);
        return newDate.getDay() + "/" + newDate.getMonth() + "/" + newDate.getFullYear();
    }

    const handleSelectRange = (dateRange: [Dayjs, Dayjs]) => {
        setDateFilter(dateRange);
    };

    const itemDateBetweenFilter = (date: string) => {
        const saleDate = dayjs(date).format("DD/MM/YYYY");

        if (dateFilter === undefined || dateFilter.length === 0) return true;
        return dateFilter[0].isBefore(saleDate) &&  dateFilter[1].isAfter(saleDate);
    } 

    return (
        <>
            {loadingDetails ? 
                <div className='loadingContainer'>
                    <CircularProgress color='inherit'/>
                </div>
            :
            sellerDetails && 
            <div className='sellerInfoWrapper'>
                <div className='sellerInfoContainer'>
                    <div>
                        <div className="nicknameText">{sellerDetails.seller.nickname}</div>

                        <div>
                            <div className='stats'>Estadísticas últimos 120 días</div>

                            <div className='statsContainer'>
                                <div className='statsText'>{`Ventas: ${sellerDetails.seller.seller_reputation.metrics.sales.completed}`}</div>
                                <div className='statsText'>{`Cancelaciones: ${sellerDetails.seller.seller_reputation.metrics.cancellations.value}`}</div>
                                <div className='statsText'>{`Reclamos: ${sellerDetails.seller.seller_reputation.metrics.claims.value}`}</div>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <div className='memberSince'>{"Miembro desde: " + getDate(sellerDetails?.seller?.registration_date)}</div>

                        <div className='reputationContainer'>
                            <div className='reputation'>Reputación:</div>
                            <Rating name="read-only" value={Number(sellerDetails?.seller?.seller_reputation?.level_id.slice(0, 1))} readOnly />
                        </div>
                    </div>
                </div>

                <div className='sellerHistoryWrapper'>
                    <div className='sellerHistoryContainer'>
                        <div className='sellHistoryText'>Histórico de ventas</div>
                        <DateRangePicker initialDate={dayjs(getDate(sellerDetails?.seller?.registration_date))} endDate={dayjs()} handleSelectRange={handleSelectRange} />
                    </div>

                    {sellerHistory.map((product: any, index: string) => {return itemDateBetweenFilter(product.sale_date) && <ProductHistoryItem key={index} product={product} />})}
                </div>
            </div>
            }
        </>
    )
}

export default SellerDetails;