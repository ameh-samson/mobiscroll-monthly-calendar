import { useGlobalContext } from "@/hooks/useGlobalContext";
import Layout from "@/layout/Layout";

function App() {
  const { data } = useGlobalContext();
  console.log(data);

  return (
    <Layout>
      <h2 className="text-red-600">Hello</h2>;
    </Layout>
  );
}

export default App;
