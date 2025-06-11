

export default function TopBar(){
    return (
        <div className="border-b mb-4 mt-2 pb-4 border-stone-300">
               <button className="flex p-0.5 hover:bg-stone-200 rounded 
            transition-colors relative gap-2 w-full items-center">
                <img 
                    src="https://api.dicebear.com/9.x/notionists/svg"
                    alt="avatar" 
                    className="size-8 rounded shrink-0 bg-careline-blue 
                    shadow"
                />
                <div className="text-start">
                    <span className="text-sm font-bold block">Dr. Pietro Andrade</span>
                    <span className="text-xs block text-stone-500">Pronto-Socorro</span>
                </div>
                

            </button>
            
            
            
        </div>
    )
} 

