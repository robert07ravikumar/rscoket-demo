package org.mvnsearch.rsocket.responder;

import org.mvnsearch.account.Stock;
import org.mvnsearch.account.StockService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import lombok.extern.slf4j.Slf4j;

import java.util.Arrays;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Slf4j
@Controller
@MessageMapping("org.mvnsearch.account.AccountService")
public class StockServiceImpl implements StockService {
    @Override
    @MessageMapping("findById")
    public Mono<Stock> findById(Integer id) {
        return Mono.just(new Stock(id, "Alibaba" + id,getRandomNumberUsingInts(23,45),"ALI"));
    }

    @MessageMapping("findSub")
    public Mono<List<Stock>> findSub(String ids) {
        log.info("Flux");
        List subscribedStocks = Arrays.stream(ids.split(","))
                .map(x ->  Integer.parseInt(x))
                .map(x -> new Stock(x, "Alibaba" + x,getRandomNumberUsingInts(23,45),"ALI"))
                .collect(Collectors.toList());
        return Mono.just(subscribedStocks);
    }

    @Override
    @MessageMapping("findAll")
    public Flux<Stock> findAll() {
        return Flux.just(new Stock(1, "Amazon",getRandomNumberUsingInts(32,65),"AMZN"),
                new Stock(2, "Google",getRandomNumberUsingInts(78,43),"GOO"));
    }

    public int getRandomNumberUsingInts(int min, int max) {
        Random random = new Random();
        return random.ints(min, max)
                .findFirst()
                .getAsInt();
    }
}
