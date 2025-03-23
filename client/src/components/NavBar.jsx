import SearchBox from "./SearchBox";

export default function NavBar()
{
    return(
        <div>
            {/*Button for slide-out menu*/}
            <div>
                <button>☰</button>
            </div>
            
            {/*Searchobx*/}
            <div>
                <SearchBox>
                    
                </SearchBox>
            </div>
        </div>
    );
}