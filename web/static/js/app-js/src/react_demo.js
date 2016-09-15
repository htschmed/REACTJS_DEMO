
/*ECMAScript 2015 format*/

class CommentBox extends React.Component{
  
  constructor(props) {
      super(props);
      this.state = {data: []};

      //Bind "this" keyword
      this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
      this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
      this.componentDidMount = this.componentDidMount.bind(this);
      this.render = this.render.bind(this);
  }

  loadCommentsFromServer() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  handleCommentSubmit(comment) {
    var comments = this.state.data;
    // Optimistically set an id on the new comment. It will be replaced by an
    // id generated by the server. In a production application you would likely
    // not use Date.now() for this and would have a more robust system in place.
    comment.id = Date.now();
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});

    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
	this.setState({data: comments});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  componentDidMount() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  }

  render() {
    return (
      <div className="commentBox">
        <hi>Comments</hi>
	<CommentList data={this.state.data} />
	<CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
}

class CommentList extends React.Component{

  constructor(props) {
      super(props);
      
      //Bind "this" keyword
      this.render = this.render.bind(this);
  }

  render() {
      var commentNodes = this.props.data.map(function(comment) {
	  return (
		  <Comment author={comment.author} key={comment.id}>
		  {comment.text}
                  </Comment>
	  );
      });

    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
}

class CommentForm extends React.Component{
  constructor(props){
      super(props);
      this.state = {author: '', text: ''};
      //Need to bind all methods that reference "this" keyword
      this.handleAuthorChange = this.handleAuthorChange.bind(this);
      this.handleTextChange = this.handleTextChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.render = this.render.bind(this);
  }

  handleAuthorChange(e) {
    this.setState({author: e.target.value});
  }

  handleTextChange(e) {
    this.setState({text: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text});
    this.setState({author: '', text: ''});
  }

  render() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
	<input
          type="text"
          placeholder="Your name"
          value={this.state.author}
          onChange={this.handleAuthorChange}
        />
        <input
          type="text"
          placeholder="Say something..."
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
}

class Comment extends React.Component{
  constructor(props) {
      super(props);
      
      //Bind "this" keyword
      this.render = this.render.bind(this);
  }

  render() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        {this.props.children}
      </div>
    );
  }
}

//This must be done at the end before loading
$(document).ready(function(){
   ReactDOM.render(
     <CommentBox url="/react_demo/api/comments"  pollInterval={2000} />,
     document.getElementById('content')
   );
});
