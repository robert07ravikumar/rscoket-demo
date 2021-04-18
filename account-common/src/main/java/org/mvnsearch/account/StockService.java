package org.mvnsearch.account;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

public interface StockService {

    Mono<Stock> findById(Integer id);

    Flux<Stock> findAll();

    Mono<List<Stock>> findSub(String ids);

}
