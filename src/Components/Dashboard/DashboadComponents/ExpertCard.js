import React, { Component } from 'react'
import { withFirestore } from 'react-redux-firebase';
import { connect } from 'react-redux';
class ExpertCard extends Component {
  state = {
    isFollowed: null
  }
  async isFollowed() {
    const { currentUser, firestore } = this.props
    const doc = await firestore.get({ collection: 'relationships', doc: `${currentUser.uid}_${this.props.expert.id}` })
    this.setState({ isFollowed: doc.exists })
  }
  componentDidMount() {
    this.isFollowed()
  }
  follow(followedId) {
    const { firestore, currentUser } = this.props
    firestore.set({ collection: 'relationships', doc: `${currentUser.uid}_${followedId}` }, { followedId, followerId: currentUser.uid, createdAt: firestore.FieldValue.serverTimestamp() })
    this.setState({ isFollowed: true })
  }
  unfollow(followedId) {
    const { firestore, currentUser } = this.props
    firestore.delete({ collection: 'relationships', doc: `${currentUser.uid}_${followedId}` })
    this.setState({ isFollowed: false })
  }
  render() {
    const { expert } = this.props
    return (
      <div className="media mb-3">
        <img alt="96x96" className="media-object d-flex mr-3 align-self-center bg-danger height-50 rounded-circle" src={expert.photoURL} />
        <div className="media-body">
          <h4 className="font-medium-1 mt-2 mb-0">{expert.username}</h4>
        </div>
        {this.state.isFollowed !== null ? (this.state.isFollowed ? <button onClick={() => this.unfollow(expert.id)} type="button" className="d-flex ml-3 btn btn-raised btn-round gradient-man-of-steel btn-outline-grey py-2 width-150 justify-content-center">Unfollow</button> : <button onClick={() => this.follow(expert.id)} type="button" className="d-flex ml-3 btn btn-raised btn-round gradient-man-of-steel btn-outline-grey py-2 width-150 justify-content-center">Follow</button>) : null}
        {/* <a className="d-flex ml-3 btn btn-raised btn-round gradient-man-of-steel btn-outline-grey py-2 width-150 justify-content-center">Follow</a> */}
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return ({
    currentUser: state.firebase.auth
  })
};
export default connect(mapStateToProps, null)(withFirestore(ExpertCard));