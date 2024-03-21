package com.catale.backend.global.config;

import com.catale.backend.global.interceptor.NicknameValidInterceptor;
import com.catale.backend.global.resolver.AccessTokenArgumentResolver;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

    private final AccessTokenArgumentResolver accessTokenArgumentResolver;
    private final NicknameValidInterceptor nicknameValidInterceptor;

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(accessTokenArgumentResolver);
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(nicknameValidInterceptor)
                .addPathPatterns("/api/member/nickname/**");
    }
}

