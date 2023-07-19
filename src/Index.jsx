import DataContext from "./DataContext.jsx";

// containers
import UserSection from "./container/UserSection.jsx";
import CommentSection from "./container/CommentSection.jsx";

// components
import CommentCard from "./components/CommentCard.jsx";
import ReplyCard from "./components/ReplyCard.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import DeleteReplyConfirm from "./components/DeleteReplyConfirm.jsx";
import ReplyInput from "./components/ReplyInput.jsx";
import EditComment from './components/EditComment.jsx'
import EditReply from "./components/EditReply.jsx";

// avatar
import julius from './images/avatars/image-juliusomo.png'
import ImageGallery from "./ImageGallery.jsx";
import dave from './images/avatars/silverdave.png'

// icons
import plus from './images/icon-plus.svg'
import minus from './images/icon-minus.svg'
import edit from './images/icon-edit.svg'
import del from './images/icon-delete.svg'
import reply from './images/icon-reply.svg'


export { DataContext, CommentSection, UserSection, CommentCard, ReplyCard, DeleteConfirmation, DeleteReplyConfirm, ReplyInput, EditComment, EditReply ,julius, dave ,ImageGallery, plus, minus, del, edit, reply };