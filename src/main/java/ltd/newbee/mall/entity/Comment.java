package ltd.newbee.mall.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@TableName("comment")

public class Comment {
    @TableId(type = IdType.AUTO)
    private Long id;
    private Long userId;
    private int entityType;
    private int entityId;
    private Long targetId;
    private String content;
    //0正常 1被禁
    private int status;
    private Date createTime;
}