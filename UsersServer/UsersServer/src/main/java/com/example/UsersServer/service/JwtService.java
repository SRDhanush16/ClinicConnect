package com.example.UsersServer.service;

import com.example.UsersServer.model.Users;
import com.example.UsersServer.repository.TokenUsersRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.function.Function;

@Service
public class JwtService {

    // we need a 256 bit length secret key
    private final String SECRET_KEY = "4bb6d1dfbafb64a681139d1586b6f1160d18159afd57c8c79136d7490630407c";

    @Autowired
    private TokenUsersRepository tokenUsersRepository;


    /*
    * we getting the secert key and doing some decoding operation and turing the secretkey into byte array,
    * now whill be suitable for signing HMAC
    * there the HMAC used is HMAC SHA 256 why is you have mentioned that Keys.hmacShaKeyFor(..)
    * the Keys is from the jsonwebtoken package and it provides methods wihic sign token using SHA hashing alogorithm.
    * why 256 , is beacuse the secert key length is 256 bit, so that why it automatically sign with SHA256 algo.
    * */
    private SecretKey getSigninKey() {
        byte[] keyBytes = Decoders.BASE64URL.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    // bunch of validating methods
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
    public <T> T extractClaim(String token, Function<Claims, T> resolver) {
        Claims claims = extractAllClaims(token);
        return resolver.apply(claims);
    }
    private Claims extractAllClaims(String token) {
        return Jwts
                .parser()
                .verifyWith(getSigninKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public boolean isValidUser(String token, UserDetails user) {
        String username = extractUsername(token);

        boolean validToken = tokenUsersRepository
                .findByToken(token)
                .map(t -> !t.isLogged_out())
                .orElse(false);

        return (username.equals(user.getUsername())) && !isTokenExpired(token) && validToken;
    }

    public String generateTokenforUser(Users user) {

        String token = Jwts
                .builder()
                .subject(user.getUsername()) // add claim
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 120*60*1000 ))
                .signWith(getSigninKey())
                .compact();

        return token;
    }
}
