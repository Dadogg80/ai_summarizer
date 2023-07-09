import { useEffect, useState } from "react"
import { useLazyGetSummaryQuery } from "../services/article";
import { copy, linkIcon, loader, tick } from "../assets"

const Demo = () => {
  const [article, setArticle] = useState({
    url: '',
    summary: '',
  })

  const [allArticles, setAllArticles] = useState([]);

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articleFromLocalStorage = JSON.parse(
      localStorage.getItem('article')
    );

    if(articleFromLocalStorage) {
      setArticle(articleFromLocalStorage);
    }

  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await getSummary({articleUrl: article.url});

    if(data?.summary) {
      const newArticle = {...article, summary: data.summary}
      
      setArticle(newArticle);
      const updatedAllArticles = [...allArticles, newArticle];
      setAllArticles(updatedAllArticles);
      localStorage.setItem('article', JSON.stringify(updatedAllArticles));

      console.log(newArticle, updatedAllArticles)
    }

  }

  return (
    <section className="mt-16 w-full max-w-xl">
      {/* Search */}
      <div className="flex flex-col w-full gap-2">
        <form 
          className="relative flex justify-center items-center"
          onSubmit={handleSubmit}
        >
          <img 
            src={linkIcon} 
            alt="link_icon" 
            className="absolute left-0 my-2 ml-3 w-5" 
          />
          <input 
            type="url"
            placeholder="Enter a URL"
            value={article.url}
            onChange={(e) => setArticle({
              ...article, url: e.target.value})} 
            required
            className="url_input peer"
          />

          <button 
            type="submit" 
            className="submit_btn peer-focus:border.gray-700 peer-focus:text-gray-700"
          >
            <p>↵</p>
          </button>
        </form>

        {/*  Browse URL History */}
        <div className="flex flex-col gap-2">
        
        </div>


      </div>

        {/*  Display Results */}
    </section>
  )
}

export default Demo