Spring Boot RSocket Demo
========================

Spring Boot RSocket communication with RPC(interface) style.

# Run UI

* Move to the rsocket-react-demo folder and run the below commands

```java
	npm install
	
	npm start

```

* On responder side: implement Service Interface and annotate it with @Controller and @MessageMapping to make it exposed as RSocket service.

```java
@Service
@Controller
@MessageMapping("org.mvnsearch.account.AccountService")
public class StockServiceImpl implements StockService  {
    @Override
    @MessageMapping("findById")
    public Mono<Account> findById(Integer id) {
        return Mono.just(new Account(id, "nick:" + id));
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
}
```
### Start backened

* import the project as exisitng resources in intellij
* do mvn clean install at the root level
* rsocket-responder: Build and run rsocket responder 
* rsocket-react-demo: call rsocket service from browser

# Browser support

Please refer [rsocket-react-demo](rsocket-react-demo) for RSocket and React integration.

# Development

### Requirements

* Jdk 11+
* Spring Boot 2.2.4

### Maven Modules

* account-common: Reactive Service API
* rsocket-rpc-spring-boot-starter: Spring Boot Starter to make RSocket call as RPC style
* rsocket-responder: supply RSocket services
* rsocket-react-demo: call rsocket service from browser

### RSocket acceptor & handler registry

* acceptor: RSocketMessageHandler.createResponder()
* all @MessageMapping methods: rsocketMessageHandler.getHandlerMethods()

# References

* Spring RSocket: https://docs.spring.io/spring/docs/5.2.3.RELEASE/spring-framework-reference/web-reactive.html#rsocket
* Spring Boot RSocket: https://docs.spring.io/spring-boot/docs/2.2.4.RELEASE/reference/html/spring-boot-features.html#boot-features-rsocket
* RSocket: http://rsocket.io/
