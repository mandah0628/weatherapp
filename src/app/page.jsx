import SearchBox from "@/components/SearchBox";
import Menu from "@/components/Menu";

export default function Home() {
  return (
    <div className="h-screen  bg-cover bg-center">
      <div>
        <Menu></Menu>
      </div>
      <div className="flex items-center justify-center h-full opacity-75">
          <SearchBox/>
      </div>
    </div>
    );
}
