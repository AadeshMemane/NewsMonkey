import React, { useEffect, useState } from 'react'
import Newsitem from './Newsitem'
import SSpinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroller'

const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const updateNews = async () => {
    props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`
    setLoading(true)
    let data = await fetch(url)
    props.setProgress(30)

    let parsedData = await data.json()
    ////console.log(parsedData);
    props.setProgress(70)
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100)
  }
  useEffect(() => {
    document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey `
    updateNews() //eslint-disable-line react-hooks/exhaustive-deps
  }, [])

  // handleNextClick = async () => {
  //     ////console.log("Next");

  //     // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize))) {

  //     //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ae01f9231e7d4a54b619e53c75838419&page=${this.state.page + 1}&pageSize=${props.pageSize}`;

  //     //     this.setState({ loading: true });
  //     //     let data = await fetch(url);
  //     //     let parsedData = await data.json();
  //     //     // //console.log(parsedData);

  //     //     this.setState(
  //     //         {
  //     //             page: this.state.page + 1,
  //     //             articles: parsedData.articles,
  //     //             loading: false

  //     //         }
  //     //     )
  //     // }
  //     this.setState({ page: this.state.page + 1 });
  //     this.updateNews();

  // }

  // handlePrevClick = async () => {
  //     //console.log("Previous");

  //     // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ae01f9231e7d4a54b619e53c75838419&page=${this.state.page - 1}&pageSize=${props.pageSize}`;
  //     // this.setState({ loading: true });
  //     // let data = await fetch(url);
  //     // let parsedData = await data.json();
  //     // //console.log(parsedData);

  //     // this.setState(
  //     //     {
  //     //         page: this.state.page - 1,
  //     //         articles: parsedData.articles,
  //     //         loading: false

  //     //     }
  //     // )
  //     this.setState({ page: this.state.page - 1 });
  //     this.updateNews();

  // }
  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=ae01f9231e7d4a54b619e53c75838419&page=${
      page + 1
    }&pageSize=${props.pageSize}`
    setPage(page + 1)

    setLoading(true)
    let data = await fetch(url)
    let parsedData = await data.json()
    //console.log(parsedData);
    setArticles(articles.concat(parsedData.articles))
    setLoading(false)
  }

  return (
    <>
      <h1 className='text-center ' style={{ marginTop: '55px' }}>
        NewsMonkey Top {capitalizeFirstLetter(props.category)} Headlines
      </h1>
      {loading && <SSpinner />}
      <InfiniteScroll
        pageStart={0}
        hasMore={articles?.length !== totalResults}
        loadMore={fetchMoreData}
        loader={<SSpinner />}
      >
        <div className='container'>
          <div className='row'>
            {articles?.map((element) => {
              return (
                <div className='col-md-4' key={element.url}>
                  <Newsitem
                    title={element.title ? element.title.slice(0, 40) : ''}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ''
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  )
}

News.defaultProps = {
  country: 'in',
  pageSize: 5,
  category: 'general',
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string.isRequired,
}

export default News
