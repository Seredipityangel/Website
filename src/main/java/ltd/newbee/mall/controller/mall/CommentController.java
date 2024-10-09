package ltd.newbee.mall.controller.mall;
import ltd.newbee.mall.common.Constants;
import ltd.newbee.mall.controller.vo.NewBeeMallUserVO;
import ltd.newbee.mall.entity.Comment;
import ltd.newbee.mall.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.thymeleaf.util.StringUtils;
import javax.servlet.http.HttpSession;
import java.util.Date;
@Controller
public class CommentController {
    @Autowired
    private CommentService commentService;
    @PostMapping("/addComment/{goodsId}")
    public String addComment(@PathVariable("goodsId") int goodsId,
                             Comment comment,
                             HttpSession session) {
        if (StringUtils.isEmpty(comment.getContent())) {
            return "redirect:/goods/detail/" + goodsId;
        }
        NewBeeMallUserVO user = (NewBeeMallUserVO) session.getAttribute(Constants.MALL_USER_SESSION_KEY);
        comment.setUserId(user.getUserId());
        comment.setStatus(0);
        comment.setCreateTime(new Date());
        commentService.addComment(comment);
        return "redirect:/goods/detail/" + goodsId;
    }
}