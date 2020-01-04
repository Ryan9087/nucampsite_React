import React, { Component } from "react";
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';


class CampsiteInfo extends Component {
    renderCampsite(campsite) {
        return (
            <div className="col-md-5 m-1">
                <Card onClick={() => this.onCampsiteSelect(campsite)}>
                    <CardImg width="100%" src={campsite.image} alt={campsite.name} />
                    <CardImgOverlay>
                        <CardTitle>{campsite.name}</CardTitle>
                    </CardImgOverlay>
                </Card>
            </div>
        );
    }



    renderComments(comments) {
        if (comments) {
            return (
                <div className="cold-md-5 m-1">

                    <h4>Comments</h4>

                    {comments.map(comment => {
                        return (
                        <div>
                            <p>{comment.text} <br />
                                -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}
                            </p>
                        </div>
                        )
                    }
                    )
                }

                </div>
            )
        }
    };



    render() {
        if (this.props.campsite) {
            return (
            <div className="Row">
            {this.renderCampsite(this.props.campsite)}
            {this.renderComments(this.props.campsite.comments)}
            </div>   
       )
        } else {       
       return (
       <div></div>
       )
    };
}
};


export default CampsiteInfo;


