import * as React from 'react'

export const DurationPicker: React.FC<{ name: string }> = ({ name }) => {
  const [hoursOptions, setHoursOptions] = React.useState<string[]>([])
  const [minutesOptions, setMinutesOptions] = React.useState<string[]>([])

  React.useEffect(() => {
    const fetchOptions = async () => {
      const hours = Array.from({ length: 24 }, (_, i) => `${i}`.padStart(2, '0'))
      const minutes = Array.from({ length: 60 }, (_, i) => `${i}`.padStart(2, '0'))

      setHoursOptions(hours)
      setMinutesOptions(minutes)
    }

    fetchOptions()
  }, [])

  return (
    <div className="custom-select-component">
      <style>
        {`
          .custom-select-component {
            font-family: Arial, sans-serif;
            padding: 10px;
            background-color: rgb(34, 34, 34);
            border-radius: 8px;
            width: 200px;
            margin: 1%;
          }

          .duration-picker {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .duration-input {
            width: 120px;
            padding: 5px;
            font-size: 14px;
            border: 1px solid #ccc;
            border-radius: 4px;
            text-align: center;
            margin: 0 5px;
          }

          .separator {
            font-size: 20px;
          }

          .duration-input:focus {
            outline: none;
            border-color: #007bff;
            box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
          }

          .name {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
          }
        `}
      </style>

      <p className="name"> {name} </p>

      <div className="duration-picker">

        <select id="hours" className="duration-input">
          {hoursOptions.map((hour) => (
            <option key={hour} value={hour}>{hour}</option>
          ))}
        </select>

        <span className="separator">:</span>

        <select id="minutes" className="duration-input">
          {minutesOptions.map((minute) => (
            <option key={minute} value={minute}>{minute}</option>
          ))}
        </select>

      </div>
    </div>
  );
};
