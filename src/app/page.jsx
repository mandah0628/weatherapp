import SearchBox from "@/components/SearchBox";
import NavBar from "@/components/NavBar";

export default function Home() {
  return (
    <div className="h-screen bg-[url('../img/background.jpg')] bg-cover bg-center">
      <div>
        <NavBar />
      </div>
      <div className="flex items-center justify-center h-full opacity-75">
        <SearchBox />
      </div>
    </div>
    );
}
