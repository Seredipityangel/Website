package ltd.newbee.mall.dao;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import ltd.newbee.mall.entity.Comment;
import ltd.newbee.mall.util.PageQueryUtil;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface CommentMapper extends BaseMapper<Comment> {

    List<Comment> findCommentList(PageQueryUtil pageUtil);

    int lockCommentBatch(@Param("ids") Integer[] ids, @Param("lockStatus") int lockStatus);

}