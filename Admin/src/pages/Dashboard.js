import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Column } from '@ant-design/plots';
import ExportExcelButton from '../components/ExportExcelButton';
import { useDispatch, useSelector } from 'react-redux';
import { GetSalesOfYear } from '../features/invoice/invoiceSlice';

const Dashboard = () => {
    const dispatch = useDispatch()
    const salesState = useSelector(state => state.invoice?.sales)
    const [monthData, setMonthData] = useState([]);
    useEffect(()=>{
        dispatch(GetSalesOfYear())
    }, [])
    useEffect(()=>{
        let monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        let data = []
        for (let index = 0; index < salesState?.length; index++) {
            const element = salesState[index];
            data.push({
                type: monthNames[element?.month]?monthNames[element?.month]:"January",
                sales: element?.sale  
            })
        }
        setMonthData(data)
    }, [salesState])
    
    const config = {
        data:   monthData,
        xField: 'type',
        yField: 'sales',
        columnWidthRatio: 0.8,
        xAxis: {
            label: {
                autoHide: true,
                autoRotate: false,
            },
        },
        meta: {
            type: {
                alias: '类别',
            },
            sales: {
                alias: '销售额',
            },
        },
    };
    const transformedData = monthData?.map(item => [item.type, item.sales]) || [];
    return (
        <div>
            <h3 className='mb-4'>Dashboard</h3>
            {/* <div className='d-flex justify-content-between align-item-center gap-3'>
                <div className='d-flex justify-content-between align-item-end flex-grow-1 bg-white p-3 rounded-3'>
                    <div><p>total</p><h4>1000$</h4></div>
                    <div className='d-flex flex-column align-items-end'><h6>32%</h6><p>April 2023</p></div>
                </div>
                <div className='d-flex justify-content-between align-item-end flex-grow-1 bg-white p-3 rounded-3'>
                    <div><p>total</p><h4>1000$</h4></div>
                    <div className='d-flex flex-column align-items-end'><h6>32%</h6><p>April 2023</p></div>
                </div>
                <div className='d-flex justify-content-between align-item-end flex-grow-1 bg-white p-3 rounded-3'>
                    <div><p>total</p><h4>1000$</h4></div>
                    <div className='d-flex flex-column align-items-end'><h6>32%</h6><p>April 2023</p></div>
                </div>
            </div> */}
            <br></br>
            <div>
                <ExportExcelButton data={transformedData} filename="data" />
            </div>
            <div>
                <h4>Income Chart</h4>
                <br></br>
                <Column {...config} />
            </div>
        </div>
    );
};

export default Dashboard;