import type { LoaderArgs } from "@remix-run/node"

type LoaderType = {
  DB_CONNECTION_STRING: string
  TIMEOUT: number
}

/**
 * Here environment variables are available on server
 * @param param0 
 * @returns 
 */
export async function loader({ request }: LoaderArgs) {  
  const variables: LoaderType = {
    DB_CONNECTION_STRING: ENV.DB_CONNECTION_STRING,
    TIMEOUT: ENV.TIMEOUT
  }

  console.log(variables)

  return null
};

/**
 * 
 * @returns 
 */
export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Environment Variables</h1>

      {/* Here DB_CONNECTION_STRING is not accessible on browser */}
      <h2>DB_CONNECTION_STRING: {ENV.DB_CONNECTION_STRING || 'not accessible in browser'}</h2>

      {/* Here timeout is available because root.tsx put it on window */}
      <h2>TIMEOUT: {ENV.TIMEOUT}</h2>
    </div>
  );
}
