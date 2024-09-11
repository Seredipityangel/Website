package ltd.newbee.mall;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@MapperScan("Itd.newbee.mall.dao")
@SpringBootApplication
public class NewBeeMallApplication {
    public static void main(String[]args){
        SpringApplication.run(NewBeeMallApplication.class,args);
    }
}