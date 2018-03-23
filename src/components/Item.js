import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { loadItem, clearItem } from '../AC/itemAC'
import { clearComments } from '../AC/commentsAC'
import CommentsList from './CommentsList'
import NotFaund from './NotFaund'
import Loading from './Loading'
import decodeHtml from '../utils/decodeHtml'
import getTimeAgo from '../utils/getTimeAgo'


class Item extends Component {
  componentWillMount() {
    console.log('Item will mount!')
    this.props.loadItem(this.props.id)
  }
  render() {
    let { url, id, title, score, by, time, descendants, text, kids} = this.props.item
    if (this.props.loading) return <Loading />
    return this.props.item ? 
      <div>
        <h1>ItemPage</h1>
        <div>
          <h3><a href={url ? url : `/item/${id}`}>{title}</a></h3>
          <div>
            <span>{score} points
              | by <NavLink to={`/user/${by}`}>{by}</NavLink>
              | {getTimeAgo(time)}
              | <NavLink to={`/item/${id}`}>{descendants} comments</NavLink>
            </span>
          </div>
        </div>
        {text ? <p>{decodeHtml(text)}</p> : ''}
        {kids ? <CommentsList kids={kids} id={id} />
          : ''}
      </div>
    : <NotFaund/>
  }
}

export default connect((state) => {
  return {
    item: state.item.data,
    loading: state.item.loading
  }
}, { loadItem, clearItem, clearComments })(Item)