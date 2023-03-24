import { json, type LoaderArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

type Holiday = {
  name: string
  type: string
  date: string
}

/**
 * Loader function. Will be run in server on route access
 * @param param0 
 * @returns Holiday[]
 * 
 * https://remix.run/docs/en/1.14.3/tutorials/blog#loading-data
 * https://remix.run/docs/en/1.14.3/hooks/use-loader-data
 */
export async function loader({ request }: LoaderArgs) {
  const holidayResponse = await fetch('https://brasilapi.com.br/api/feriados/v1/2023')
  const holidays: Holiday[] = await holidayResponse.json()  
  return json(holidays)
};

/**
 * Default export. It will be show in browser
 * @returns JSX
 */
export default function () {
  const holiday = useLoaderData<typeof loader>()

  return (
    <div>
      <h1>Brazilian National Holidays 2023</h1>

      <ul 
        style={{ 
          all: 'unset',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          listStyle: 'none',
        }}
      >
        {holiday.map(({ name, date, type }) => (
          <li 
            key={date} 
            style={{
              backgroundColor: '#f0ecec',
              border: '1px solid #333',
              flex: '0 0 300px',
              padding: '10px',
              borderRadius: '8px',
              boxShadow: '2px 4px 6px rgba(0,0,0,0.3)',
              fontSize: '1.2rem'
            }}
          >
            <p>{name}</p>
            <p>{type}</p>
            <p>{date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}