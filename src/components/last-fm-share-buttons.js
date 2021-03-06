import React from 'react';
import { 
    FacebookShareButton, 
    FacebookIcon,
    TwitterShareButton,
    TwitterIcon,
    LinkedinShareButton,
    LinkedinIcon,
    RedditShareButton,
    RedditIcon,
    TumblrShareButton,
    TumblrIcon,
    EmailShareButton,
    EmailIcon,
    LivejournalShareButton,
    LivejournalIcon
} from 'react-share';

const LastFMShareButtons = ({shareUrl}) => {
    return (
        <div className="share-networks-container">
            <h4>Share these results:</h4>
            <div className="share-network">
                <FacebookShareButton className="share-network-button" url={shareUrl}>
                    <FacebookIcon size={32} round={true} />
                </FacebookShareButton>
            </div>
            <div className="share-network">
                <TwitterShareButton className="share-network-button" url={shareUrl}>
                    <TwitterIcon size={32} round={true} />
                </TwitterShareButton>
            </div>
            <div className="share-network">
                <LinkedinShareButton className="share-network-button" url={shareUrl}>
                    <LinkedinIcon size={32} round={true} />
                </LinkedinShareButton>
            </div>
            <div className="share-network">
                <RedditShareButton className="share-network-button" url={shareUrl}>
                    <RedditIcon size={32} round={true} />
                </RedditShareButton>
            </div>
            <div className="share-network">
                <TumblrShareButton className="share-network-button" url={shareUrl}>
                    <TumblrIcon size={32} round={true} />
                </TumblrShareButton>
            </div>
            <div className="share-network">
                <LivejournalShareButton className="share-network-button" url={shareUrl}>
                    <LivejournalIcon size={32} round={true} />
                </LivejournalShareButton>
            </div>
            <div className="share-network">
                <EmailShareButton className="share-network-button" url={shareUrl}>
                    <EmailIcon size={32} round={true} />
                </EmailShareButton>
            </div>
        </div>
    );
}

export default LastFMShareButtons;