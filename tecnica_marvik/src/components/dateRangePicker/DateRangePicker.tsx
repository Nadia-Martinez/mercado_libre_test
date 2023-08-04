import React from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/es';

import "./DateRangePicker.css";

export interface DateRangePickerProps {
	initialDate: Dayjs;
    endDate: Dayjs;
    handleSelectRange: any;
}

function DateRangePicker(props: DateRangePickerProps) {
    const [iniValue, setIniValue] = React.useState<Dayjs | null>(dayjs(props.initialDate));
    const [endValue, setEndValue] = React.useState<Dayjs | null>(dayjs(props.endDate));

    React.useEffect(() => {
        props.handleSelectRange([iniValue, endValue])
    }, [iniValue, endValue, props]);
    
    return (
        <div className="datePickerContainer">
            <div className="iniDatePickerContainer">
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                    <DatePicker label="Fecha de inicio" value={iniValue} onChange={(newValue) => setIniValue(newValue)} disableFuture minDate={props.initialDate}/>
                </LocalizationProvider>
            </div>
            
            <div>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
                    <DatePicker label="Fecha de fin" value={endValue} onChange={(newValue) => setEndValue(newValue)} disableFuture />
                </LocalizationProvider>
            </div>
        </div>
        
    )
}

export default DateRangePicker;


