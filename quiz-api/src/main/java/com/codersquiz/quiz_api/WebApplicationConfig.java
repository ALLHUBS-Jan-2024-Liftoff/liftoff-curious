package com.codersquiz.quiz_api;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
public class WebApplicationConfig implements WebMvcConfigurer {

    @Bean
    public AuthenticationFilter authenticationFilter(){
        return new AuthenticationFilter();
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry){
        registry.addInterceptor(authenticationFilter()); //I don't know why this is not working
    }

}
