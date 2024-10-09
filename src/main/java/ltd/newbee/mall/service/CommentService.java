package ltd.newbee.mall.service;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import ltd.newbee.mall.dao.CommentMapper;
import ltd.newbee.mall.entity.Comment;
import ltd.newbee.mall.util.PageQueryUtil;
import ltd.newbee.mall.util.PageResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.util.HtmlUtils;
import java.util.List;
@Service
public class CommentService {
    @Autowired
    private CommentMapper commentMapper;
    public List<Comment> findCommentsByEntityType(int entityType, Long entityId) {
        QueryWrapper<Comment> wrapper = new QueryWrapper<>();
        wrapper.eq("entity_type", entityType);
        wrapper.eq("entity_id", entityId);
        wrapper.eq("status", 0);
        wrapper.orderByAsc("create_time");
        return commentMapper.selectList(wrapper);
    }
    //评论数量
    public Long findCountByEntity(int entityType, Long entityId) {
        QueryWrapper<Comment> wrapper = new QueryWrapper<>();
        wrapper.eq("entity_type", entityType);
        wrapper.eq("entity_id", entityId);
        wrapper.eq("status", 0);
        return commentMapper.selectCount(wrapper);
    }
    @Transactional(isolation = Isolation.READ_COMMITTED, propagation = Propagation.REQUIRED)
    public void addComment(Comment comment) {
        if (comment == null) {
            throw new IllegalArgumentException("参数不能为空");
        }
        //添加评论
        comment.setContent(HtmlUtils.htmlEscape(comment.getContent()));
        commentMapper.insert(comment);
    }
    public Comment findCommentById(int id) {
        return commentMapper.selectById(id);
    }
    public Long findCountByUserId(int entityType, int userId) {
        QueryWrapper<Comment> wrapper = new QueryWrapper<>();
        wrapper.eq("entity_type", entityType);
        wrapper.eq("user_id", userId);
        return commentMapper.selectCount(wrapper);
    }
    public List<Comment> findCommentsByUserId(int entityType, int userId) {
        QueryWrapper<Comment> wrapper = new QueryWrapper<>();
        wrapper.eq("entity_type", entityType);
        wrapper.eq("user_id", userId);
        wrapper.eq("status", 0);
        wrapper.orderByAsc("create_time");
        return commentMapper.selectList(wrapper);
    }
    public PageResult getCommentsPage(PageQueryUtil pageUtil) {
        List<Comment> comments = commentMapper.findCommentList(pageUtil);
        commentMapper.selectCount(null);
        Long total = commentMapper.selectCount(null);
        return new PageResult(comments, Math.toIntExact(total), pageUtil.getLimit(), pageUtil.getPage());
    }
    public Boolean lockComments(Integer[] ids, int lockStatus) {
        if (ids.length < 1) {
            return false;
        }
        return commentMapper.lockCommentBatch(ids, lockStatus) > 0;
    }
}