import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { loadItem } from '../AC/itemAC'
import { clearComments } from '../AC/commentsAC'
import Content from './Content'
import CommentsList from './CommentsList'
import NotFaund from './NotFaund'
import Loading from './Loading'
import getTimeAgo from '../utils/getTimeAgo'
import getDomain from '../utils/getDomain'


class Item extends Component {

  componentWillMount() {
    this.props.loadItem(this.props.id)
  }

  render() {
    if (this.props.loading) return <Loading />
    if (!this.props.item) return <NotFaund />
    let { url, id, title, score, by, time, descendants, text, kids } = this.props.item
    return (
      <div>
        <h1>ItemPage</h1>
        <div>
          <h3><a href={url ? url : `/item/${id}`}>{title}</a></h3>
          {url ? <a href={url}>({getDomain(url)})</a> : ''}
          <div>
            <span>{score} points
              | by <NavLink to={`/user/${by}`}>{by}</NavLink>
              | {getTimeAgo(time)}
              | <NavLink to={`/item/${id}`}>{descendants} comments</NavLink>
            </span>
          </div>
        </div>
        {text ? <Content html={text}/> : ''}
        {kids ? <CommentsList kids={kids} id={id} />
          : ''}
      </div>
    )
  }

  componentWillUnmount() {
    this.props.clearComments()
  }
}

export default connect((state) => {
  return {
    item: state.item.data,
    loading: state.item.loading
  }
}, { loadItem, clearComments })(Item)