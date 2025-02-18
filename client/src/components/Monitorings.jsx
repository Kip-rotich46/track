import React, { useState } from 'react'

const Monitorings = () => {
    const[monitorData, setMonitorData]=useState([]);

    const getMonitoringIcon= () => {
        switch (type) {
            case 'heart-rate':
                return <FaHeartbeat className="text-3xl text-red-500" />;
            
            default:
                return <FaWalking className="text-3xl text-gray-500" />;
        }
    }

  return (
    <div>
        <h2 className='text-center font-bold text-xl'>Health Monitor</h2>
        <div className="">
            {monitorData.map((monitor) =>(
                <div key={monitor.id} className="">
                    <div className="">
                        <div className="">
                            {getMonitoringIcon(monitor.type)}
                            <span>{monitor.name}</span>
                        </div>
                        {/* Trend Indicator */}
                        {monitor.trend === 'up' ? (
                            <FaArrowUp className="text-green-500 text-xl" />
                        ):(
                            <FaArrowDown className="text-red-500 text-xl" />
                        )}
                    </div>
                    <div className="">{monitor.value}</div>
                </div>
            ))}
            <div className=""></div>
        </div>
    </div>
  )
}

export default Monitorings;